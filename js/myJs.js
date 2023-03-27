let responseCard = {};

const nameEs = document.getElementsByClassName('name_es');
nameEs[0].disabled = true;
const rareza = document.getElementById('inputGroupRareza');
rareza.disabled = true;
const save = document.getElementById('save');
save.disabled = true;
const cancel = document.getElementById('cancel');
cancel.disabled = true;
const nameEn = document.getElementById('name_en');
nameEn.disabled = false;


const search = document.getElementById('search');
search.addEventListener('click', async (event) => {
    const url = "php/getCard.php";
    const dataPost = {
        nameCard: nameEn.value
    }

    if (!(dataPost.nameCard === "")) {
        const nameCard = document.getElementsByClassName("name_card_response");
        const urlImg = document.getElementsByClassName("card-img-top");

        let dataCard = await requestHandle(url, dataPost);
        if (dataCard.error === undefined) {

            nameEs[0].disabled = false;
            rareza.disabled = false;
            save.disabled = false;
            cancel.disabled = false;
            nameEn.disabled = true;
            search.disabled = true;

            responseCard = {
                id_api: dataCard.data[0].id,
                name_en: dataCard.data[0].name,
                type: dataCard.data[0].type,
                frameType: dataCard.data[0].frameType,
                race: dataCard.data[0].race,
                attribute: dataCard.data[0].attribute,
                img: dataCard.data[0].card_images[0].image_url,
                level: dataCard.data[0].level,
                linkval: dataCard.data[0].linkval

            }
            nameCard[0].innerText = responseCard.name_en;
            urlImg[0].src = responseCard.img;
        } else {
            alert("Error: Carta no encontrada, verifique el nombre y vuelva a intentar");
            nameEn.value = "";
        }
    } else {
        alert("Error: El nombre es requerido.")
    }


});

save.addEventListener('click', async (event) => {
    const nameEn = document.getElementById('name_en');
    const nameCard = document.getElementsByClassName("name_card_response");
    const urlImg = document.getElementsByClassName("card-img-top");

    if (!(nameEs[0].value === "")) {
        if (!(rareza.value === "S")) {
            responseCard.rarezaDL = rareza.value;
            responseCard.name_es = nameEs[0].value;

            //Mandar Guardar en la base de datos
            const url = "php/saveCardDB.php";
            const responseDB = await requestHandle(url, responseCard);
            if (responseDB === 1) {
                alert("Registro Exitoso");
                nameEs[0].disabled = true;
                rareza.disabled = true;
                save.disabled = true;
                cancel.disabled = true;
                nameEn.disabled = false;
                search.disabled = false;
                nameEn.value = "";
                nameEs[0].value = "";
                rareza.value = "S";
                nameCard[0].innerText = "Nombre Oficial";
                urlImg[0].src = "resource/plantilla.jpg";
                

            } else {
                alert("Error: Carta registrada anteriormente")
            }


        } else {
            alert("Error: La rareza es requerida.");
        }

    } else {
        alert("Error: El nombre en Español es requerido.");
    }

});

cancel.addEventListener('click', (event) => {
    const nameEn = document.getElementById('name_en');
    const nameCard = document.getElementsByClassName("name_card_response");
    const urlImg = document.getElementsByClassName("card-img-top");
    nameEs[0].disabled = true;
    rareza.disabled = true;
    save.disabled = true;
    cancel.disabled = true;
    nameEn.disabled = false;
    search.disabled = false;
    nameEn.value = "";
    nameEs[0].value = "";
    rareza.value = "S";
    nameCard[0].innerText = "Nombre Oficial";
    urlImg[0].src = "resource/plantilla.jpg";
});

requestHandle = async (url, datosPost) => {
    const settings = {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosPost)
    };
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (err) {
        return err;
    }
};


const auto = document.getElementById('automatico');
auto.addEventListener('click', async (event) => {
    //Mandar Guardar en la base de datos
    const url = "php/propertyCards.php";
    const data = 80280944;
    const generarDBauto = await requestHandle(url, {data});
    console.log(generarDBauto);
});