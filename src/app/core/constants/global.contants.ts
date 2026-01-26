/*  
 * Since global env constants are stored and switched in environment angular standard 
 * Path endpoint are commonly stored in a folder in the project because endpoint will be 
 * Generally equal between evniroments to will be no need to write them up twice 
 * Capitalized underscore will be the name convenction globally used
 * Thoose will be accessible as following : GlobalConstants.API_ENDPOOINTS.PRODUCTS.GET_ALL_PRODUCTS
*/

export const GlobalConstants = {
   API_ENDPOINTS: {
      PRODUCTS: {
         GET_ALL_PRODUCTS:'get-products',
         // Product endpoints here 
      }
   },
   REGEX: {
      // Regular expressions goes here
      EMAIL:''
   }
}