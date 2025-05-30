import OrgBase from "./OrgBase.js";

export default class OrgNote extends OrgBase{
    constructor(title,createdAt,notes=""){
        super(title,createdAt,"notes")
        this.notes = notes
    }
}
