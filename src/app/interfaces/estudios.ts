export interface Estudios {
    id?: number;
    institucion: string;
    titulo: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    descripcion: string;
    url_imagen: string;
    fk_persona: number
}