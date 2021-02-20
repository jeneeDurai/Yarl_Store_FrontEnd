
export class Category {
    constructor(
        public id?: number,
        public category_name?: string,
        public category_description?: string,
        public category_banner?: string,
        public status?: string,
        public subCategories?: any[],
        public created_at?: any,
        public updated_at?: any
    ) {

    }

    reset(): void {
        this.id = undefined;
        this.category_name = undefined;
        this.category_description = undefined;
        this.category_banner = undefined;
        this.created_at = false;
        this.updated_at = undefined;
        this.subCategories = [];
    }
}
