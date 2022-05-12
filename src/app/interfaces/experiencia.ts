export interface Experiencia {
    id?: number;
    nombre_empresa: string;
    puesto: string;
    actual: boolean;
    fecha_inicio: Date;
    fecha_fin: Date;
    descripcion: string;
    tipoempleo: string;
    url_imagen: string;
    fk_persona: number
}