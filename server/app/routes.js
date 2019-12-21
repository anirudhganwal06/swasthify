import AuthRouter from './routes/auth';

const router = app => {
  //TODO: Add Routes Here
  app.use('/auth', AuthRouter);
};

export default router;