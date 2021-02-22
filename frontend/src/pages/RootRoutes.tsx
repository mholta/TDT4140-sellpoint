export enum RootRoutes {
  registerUser = '/register',
  loginUser = '/login',
  userView = '/user',
  newProduct = '/products/new',
  individualProduct = '/product/:id',
  individualProductWithoutId = '/product/',
  ownerView = '/user/profile/:email' /* Profile to product owner */,
}

export default RootRoutes;
