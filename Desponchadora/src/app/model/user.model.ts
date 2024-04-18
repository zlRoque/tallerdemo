export interface User {
    Nombre: string,
    Apellido: string,
    correoElectronico: string,
    contraseña: string,
    FechaNacimiento: Date,
    TipoUsuario: 'Empresa' | 'Cliente'
}
