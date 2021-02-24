export enum RootRoutes {
  registerUser = '/register',
  loginUser = '/login',
  userView = '/user',
  newProduct = '/products/new',
  individualProduct = '/product/:id',
  individualProductWithoutId = '/product/',
  ownerView = '/user/profile/:id' /* Profile to product owner */,
  ownerViewWithoutId = '/user/profile/' /* Profile to product owner */,
  homePage = '',
}

export default RootRoutes;
