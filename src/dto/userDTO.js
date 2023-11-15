export const userDTO =  (user) => {
    const userDTO = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        cart: user.cart,
        rol: user.rol
    }
    
    return userDTO;
}