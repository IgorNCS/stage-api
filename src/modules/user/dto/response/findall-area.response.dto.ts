import { User } from "../../entities/user.entity";

export class FindAllUserResponseDTO {
    readonly total_current: number;
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_per_pages: number;
    readonly list: User[];
    readonly totalItems: number;

    constructor(partial: Partial<FindAllUserResponseDTO>) {
        Object.assign(this, partial);
    }
}
