import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";


export const productOptions = {
    hair_style: {
        label: "Hair Style",
        choices: [
            { value: "type1", label: "", imagePath: "custom/hair1.jpg" },
            { value: "type2", label: "", imagePath: "custom/hair2.jpg" },
            { value: "type3", label: "", imagePath: "custom/hair3.jpg" },
            { value: "type4", label: "", imagePath: "custom/hair4.jpg" },
            { value: "type5", label: "", imagePath: "custom/hair5.jpg" },
            { value: "type6", label: "", imagePath: "custom/hair6.jpg" },
            { value: "type7", label: "", imagePath: "custom/hair7.jpg" },
            { value: "type8", label: "", imagePath: "custom/hair8.jpg" },
            { value: "type9", label: "", imagePath: "custom/hair9.jpg" },
            { value: "type10", label: "", imagePath: "custom/hair10.jpg" },
            { value: "type11", label: "", imagePath: "custom/hair11.jpg" },
            { value: "type12", label: "", imagePath: "custom/hair12.jpg" },
            { value: "type13", label: "", imagePath: "custom/hair13.jpg" },
            { value: "type14", label: "", imagePath: "custom/hair14.jpg" },
            { value: "type15", label: "", imagePath: "custom/hair15.jpg" },
            { value: "type16", label: "", imagePath: "custom/hair16.jpg" },
            { value: "type17", label: "", imagePath: "custom/hair17.jpg" },
            { value: "type18", label: "", imagePath: "custom/hair18.jpg" },
            { value: "type19", label: "", imagePath: "custom/hair19.jpg" },
            { value: "type20", label: "", imagePath: "custom/hair20.jpg" },
            { value: "type21", label: "", imagePath: "custom/hair21.jpg" },
            { value: "type22", label: "", imagePath: "custom/hair22.jpg" },
            { value: "type23", label: "", imagePath: "custom/hair23.jpg" },
            { value: "type24", label: "", imagePath: "custom/hair24.jpg" },
            { value: "type25", label: "", imagePath: "custom/hair25.jpg" },
            { value: "type26", label: "", imagePath: "custom/hair26.jpg" }
        ]
    },
    nipple_type: {
        label: "Nipple Type",
        choices: [
            { value: "pink", label: "", imagePath: "custom/nip1.jpg" },
            { value: "red", label: "", imagePath: "custom/nip2.jpg" },
            { value: "brown", label: "", imagePath: "custom/nip3.jpg" }
        ]
    },
    vagina_type: {
        label: "Vagina Type",
        choices: [
            { value: "pink", label: "", imagePath: "custom/pus1.jpg" },
            { value: "red", label: "", imagePath: "custom/pus2.jpg" },
            { value: "brown", label: "", imagePath: "custom/pus3.jpg" }
        ]
    },
    pubic_type: {
        label: "Pubic Hair Type",
        choices: [
            { value: "type1", label: "", imagePath: "custom/pubic1.jpg" },
            { value: "type2", label: "", imagePath: "custom/pubic2.jpg" },
            { value: "type3", label: "", imagePath: "custom/pubic3.jpg" },
            { value: "type4", label: "", imagePath: "custom/pubic4.jpg" },
            { value: "type5", label: "", imagePath: "custom/pubic5.jpg" }
        ]
    }
};

// Function to get URLs
export const getOptionImageUrls = async () => {
    const optionsWithUrls = { ...productOptions };

    for (const optionName in optionsWithUrls) {
        const choices = optionsWithUrls[optionName].choices;
        for (const choice of choices) {
            const storageRef = ref(storage, choice.imagePath);
            choice.image = await getDownloadURL(storageRef);
        }
    }

    return optionsWithUrls;
};

// Initialize selected options safely
export const initializeSelectedOptions = () => {
    const initialOptions = {};
    Object.keys(productOptions).forEach(optionName => {
        const choices = productOptions[optionName].choices;
        if (Array.isArray(choices) && choices.length > 0) {
            initialOptions[optionName] = choices[0].value;
        }
    });
    return initialOptions;
};
