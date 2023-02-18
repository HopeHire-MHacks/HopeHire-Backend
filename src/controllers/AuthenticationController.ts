import {NextFunction, Request, Response} from 'express';
import {InvalidUserPasswordError, Payload} from '../models/User';
import axios from 'axios';
import UserService from '../services/UserService';
import JWTUtils from '../utils/jwtUtils';
import PasswordUtils from '../utils/passwordUtils';
import userFriendlyMessage from '../consts/userFriendlyMessages';

require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

export default class AuthenticationController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const {password, passwordConfirmation} = req.body;
      const email = req.body.email.toLowerCase();
      const user = await this.userService.getOneUserByEmail(email);

      if (user) {
        res.status(400);
        res.json({message: userFriendlyMessage.failure.emailExists});
        return;
      }
      if (password !== passwordConfirmation) {
        res.status(400);
        res.json({
          message: userFriendlyMessage.failure.passwordConfirmationMismatch,
        });
        return;
      }

      const createdUser = await this.userService.createOneUser({
        ...req.body,
        isConfirmed: false,
        isTemporary: false,
      });
      const payload: Payload = {
        id: createdUser.id,
      };
      const accessToken = JWTUtils.generateAccessToken(payload);
      res.json({
        message: userFriendlyMessage.success.createUser,
        data: {
          accessToken: accessToken,
        },
      });
    } catch (e) {
      res.status(400);
      if (e instanceof InvalidUserPasswordError) {
        res.json({message: (e as Error).message});
      } else {
        res.json({message: userFriendlyMessage.failure.createUser});
      }
      next(e);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const {password} = req.body;
      const email = req.body.email.toLowerCase();
      const user = await this.userService.getOneUserByEmail(email, true);

      if (!user) {
        res.status(401);
        res.json({message: userFriendlyMessage.failure.emailNotExist});
        return;
      }
      if (!(await user.isPasswordMatch(password))) {
        res.status(401);
        res.json({message: userFriendlyMessage.failure.incorrectPassword});
        return;
      }

      const payload: Payload = {
        id: user.id,
      };
      const accessToken = JWTUtils.generateAccessToken(payload);

      res.json({
        message: userFriendlyMessage.success.signIn,
        data: {
          accessToken: accessToken,
        },
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.signIn});
      next(e);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const {tokens} = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
      const accessToken = tokens.access_token;
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
          accessToken
      );
      const email = response.data.email;
      let user = await this.userService.getOneUserByEmail(email);
      if (!user) {
        user = await this.userService.createOneUser({
          email: email,
          password: PasswordUtils.generateRandomPassword(),
        });
      }
      const payload: Payload = {
        id: user.id,
      };
      const jwtToken = JWTUtils.generateAccessToken(payload);

      res.json({
        message: userFriendlyMessage.success.signIn,
        accessToken: jwtToken,
      });
    } catch (e) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.signIn});
      next(e);
    }
  }
}
