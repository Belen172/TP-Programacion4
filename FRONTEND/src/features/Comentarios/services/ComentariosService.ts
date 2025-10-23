import axios from 'axios'
import { type Comentario } from './../types/ComentarioTypes.ts'
export class ComentariosService {

    static async obtenerComentarios () {
        const resultado = await axios.get<Comentario[]>('https://jsonplaceholder.typicode.com/comments')
        return resultado.data
    }

}
