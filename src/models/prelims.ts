// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Prelims {
    constructor(public p_semester: string, 
                public p_studentnumber: number, 
                public p_schoolyear: string, 
                public p_course: string, 
                public id?: ObjectId) {}
}