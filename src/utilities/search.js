import { API } from "aws-amplify";
import { searchListings } from "../graphql/queries";

export var searchWithLocation = async (searchByCategory, searchByLocation) => {
	console.log("category name:", searchByCategory.catId);
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					locationID: { eq: searchByLocation.locationId },
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchWithText = async (searchString) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					title: {
						match: searchString,
					},
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchWithLocationAndText = async (
	searchString,
	searchByLocation
) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					and: {
						title: {
							match: searchString,
						},
						locationID: { eq: searchByLocation.locationId },
					},
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchByCatFunc = async (searchByCategory) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					categoryID: { eq: searchByCategory.catId },
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchWithLocationAndCategory = async (
	searchByCategory,
	searchByLocation
) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					and: {
						categoryID: { eq: searchByCategory.catId },
						locationID: { eq: searchByLocation.locationId },
					},
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchWithTextAndCategory = async (
	searchString,
	searchByCategory
) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					and: {
						categoryID: { eq: searchByCategory.catId },
						title: {
							match: searchString,
						},
					},
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
export var searchWithLocationAndTextAndCategory = async (
	searchString,
	searchByCategory,
	searchByLocation
) => {
	try {
		const newSearchItems = await API.graphql({
			query: searchListings,
			authMode: "AWS_IAM",
			variables: {
				filter: {
					and: {
						title: {
							match: searchString,
						},
						locationID: { eq: searchByLocation.locationId },
						categoryID: { eq: searchByCategory.catId },
					},
				},
			},
		});
		return newSearchItems.data.searchListings.items;
	} catch (e) {
		console.log(e);
	}
};
