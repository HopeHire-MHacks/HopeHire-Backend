export default {
  // sendGridAPI: process.env.SENDGRID_API_KEY as string,
  saltRounds: parseInt(process.env.SALT_ROUNDS as string) as number,
  jwtAccessTokenSecret: process.env.JWT_SECRET as string,
  frontendUrl: process.env.FRONTEND_BASEURL as string,
};
