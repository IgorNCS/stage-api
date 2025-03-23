import { Area } from "../../entities/area.entity";

export class FindAllAreaResponseDTO {
    readonly total_current: number;
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_per_pages: number;
    readonly list: Area[];
    readonly totalItems: number;

    constructor(partial: Partial<FindAllAreaResponseDTO>) {
        Object.assign(this, partial);
    }
}
