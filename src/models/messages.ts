export interface ListOfMessages {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
	items: Message[];
}

export interface Message {
	collectionId: string;
	collectionName: string;
	created: string;
	createdby: string;
	dislikes: number;
	expand: object;
	id: string;
	likes: number;
	message: string;
	updated: string;
}
