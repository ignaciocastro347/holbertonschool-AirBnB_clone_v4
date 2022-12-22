$(document).ready(() => {
	const checkboxes = $('input[type=checkbox]');
	const h4Amenities = $('.amenities h4');
	const divApiStatus = $("#api_status");

	const selectedAmenities = [];

	checkboxes.change(() => {
		const id = $(this).data("id");
		const name = $(this).data("name");
		const idList = selectedAmenities.map(a => a.id);

		if ($(this).is(":checked")) {
			if (!idList.includes(id))
				selectedAmenities.push({
					id,
					name
				});
		} else {
			if (idList.includes(id)) {
				const index = idList.indexOf(id);
				if (index > -1) {
					selectedAmenities.splice(index, 1);
				}
			}
		}
		const h4Content = selectedAmenities.map(a => a.name).join(", ");
		h4Amenities.text(h4Content);
	});



});

const getApiStatus = async () => {
	const res = await fetch("http://0.0.0.0:5001/api/v1/status/");
	const data = await JSON.parse(res);

	if (data.status === "OK") {
		divApiStatus.addClass("available");
	} else {
		divApiStatus.removeClass("available");
	}
}