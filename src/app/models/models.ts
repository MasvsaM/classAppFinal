export interface Curso {
    qrCode: string;
    name: string;
    seccion: string;
    image: string;
    sala: string;
    id: string;
    userId: User[];
    alumnos: User[];
    profesor: User;
}

export interface User{
[x: string]: any;
    uid: string,
    email: string,
    password: string,
    name: string,
    image: string,
    profile: 'alumno' | 'profesor' | 'admin'
}

