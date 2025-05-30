import OrgBase from "./OrgBase.js";

export default class OrgNote extends OrgBase{
    constructor(title,createdAt,notes="",id){
        super(title,createdAt,"notes",id)
        this.notes = notes
    }
}
