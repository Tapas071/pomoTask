import { Document } from "mongodb";

export interface TodoType extends Document {
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean; // Optional because it has a default value
    createdAt?: Date;      // Timestamps will auto-generate these fields
    updatedAt?: Date;
}