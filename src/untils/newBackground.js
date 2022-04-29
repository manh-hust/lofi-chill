import { BACKGROUND_LINKS_LIST } from "../constants/links/videos";

export const newBackground =  (currentBg, condition) => {
    if (
		currentBg.set === condition.set &&
		currentBg.scene === condition.scene &&
		currentBg.day === condition.day &&
		currentBg.rainy === condition.rainy
	)
		return currentBg;
    
    const newBackground = {...currentBg, show: !currentBg.show, ...condition};
    const newLink = BACKGROUND_LINKS_LIST.find(
        (item) =>
			item.set === condition.set &&
			item.scene === condition.scene &&
			item.day === condition.day &&
			item.rainy === condition.rainy
	).link; 
	
	if (currentBg.show) {
		newBackground.link2 = newLink;
	} else {
		newBackground.link1 = newLink;
	}

	return newBackground;
}