export type Doc = {
	_id: string;
	type: 'Doc';
	title: string;
	description: string;
	published: boolean;
	featured: boolean;
	component: boolean;
	author: string;
	/** MDX file body */
	body: any;
	slug: string;
	slugAsParams: string;
};
