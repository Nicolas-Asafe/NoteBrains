import repository from "../../../core/interfaces/repository.js";

const db = []

export default class MemoryRepository extends repository{
    save(data){
        db.push(data)
    }
}