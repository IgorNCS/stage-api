import { Process } from "../../entities/process.entity";

export class FindAllProcessResponseDTO {
    readonly total_current: number;
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_per_pages: number;
    readonly list: Process[];
    readonly totalItems: number;

    constructor(partial: Partial<FindAllProcessResponseDTO>) {
        Object.assign(this, partial);
    }
}
