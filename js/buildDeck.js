const monstro = document.getElementById("filterType");
const cardName = document.getElementById("filterName");
const monstroInv = document.getElementById("filterMonstroProTypeC");
const monstroAtt = document.getElementById("filterMonstroProAtt");
const monstroTyp = document.getElementById("filterMonstroProType");
const monstroLev = document.getElementById("filterMonstroProLev");
const monstroRar = document.getElementById("filterMonstroProRar");
const btnSearch = document.getElementById("btnSearch");
const codeC = document.getElementById("build_deck");

const paginationPublic = document.getElementsByClassName("paginationP");

const searchCode = document.getElementById("codeAdmin");
const point = {
    code: 0
}
let pag = {
    num_pag: 9,
    pag_cun: 1,
    ele_last_pag: 15,
    num_ele_pages: 24,

}
let datos = [];
let saveCardCun = [];

searchCode.addEventListener('submit', async (e) => {
    e.preventDefault();
    const codeData = document.getElementById('codeInput');
    const showFilter = document.getElementById('builDeck');



    const code = parseInt(codeData.value, 10);
    const url = "php/getPointAdmin.php";
    const responseDB = await requestHandle(url, { code });

    if (responseDB !== 0) {
        point.code = responseDB;
        codeData.value = "";
        showFilter.hidden = false;
        codeC.setAttribute("code", point.code);

    } else {
        alert("Error: Código invalido");
    }
});

cardName.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchShow = document.getElementById("showCards_large");
    const titleCard = document.getElementById("filterNameTitle");
    const titleCardValue = titleCard.value;
    if ((titleCardValue !== "" && titleCardValue.length > 2) || parseInt(titleCardValue, 10)) {
        titleCard.value = "";
        const url = "php/searchName.php";
        const responseDB = await requestHandle(url, { name: titleCardValue, code: point.code });
        if (responseDB['numEle'] > 0) {
            datos = responseDB;

            //Aqui ya se debio consultar a la DB,
            // el resultado de la busqueda debe ser global



            //Aqui comineza el codigo de la paginacion
            //Se debe calcular el numero de paginas y el numero de elementos de la ultima
            //Si el residuo es 0 el numero de elementos de la ultima pagina dede se el numero de elementos por pagina
            pag.num_pag = responseDB['numEle'] / pag.num_ele_pages;
            pag.num_pag = parseInt(pag.num_pag);
            if (responseDB['numEle'] % pag.num_ele_pages > 0) {
                pag.ele_last_pag = responseDB['numEle'] % pag.num_ele_pages;
                pag.num_pag += 1;
            } else {
                pag.ele_last_pag = pag.num_ele_pages;
            }
            pag.pag_cun = 1;
            showPagElement(paginationPublic[0]);

            //Aqui se muestra el contenido de la pagina 1
            //hacer funcion este codigo dandole que pagina es y cuantos elementos ocupara

            const searcShowElement = searchShow.children[0];
            showPaginaContent(searcShowElement);
            searchShow.hidden = false;
        } else {
            alert("Error: No se encontro resultados")
        }
    } else {
        alert("Error: Se requiere más de 2 caracteres.");
    }



});
monstro.addEventListener("change", (e) => {
    const cardMon = document.getElementById("filterTypeCardMon");
    const cardSpe = document.getElementById("filterTypeCardMag");
    const cardTra = document.getElementById("filterTypeCardTra");
    const cardVal = document.getElementById("filterTypeCardVal");

    const showMon = document.getElementById("filterMonstro");
    const showSpe = document.getElementById("filterSpell");
    const showTra = document.getElementById("filterTrap");
    const showVal = document.getElementById("filterValue");


    if (cardMon.checked) {
        const monstroShowP = showMon.children;
        for (i = 0; i < monstroShowP.length; i++) {
            showMon.children[i].children[0].children[0].checked = false;
            showMon.children[i].children[1].hidden = true;
        }

        showMon.hidden = false;
        showSpe.hidden = true;
        showTra.hidden = true;
        showVal.hidden = true;
    }
    if (cardSpe.checked) {
        const showP = showSpe.children[0];
        for (i = 1; i < showP.children.length; i++) {
            showP.children[i].children[0].checked = false;
        }
        showMon.hidden = true;
        showSpe.hidden = false;
        showTra.hidden = true;
        showVal.hidden = true;
        const showRare = document.getElementById("filterSpellRareDL");
        for (let k = 1; k < showRare.children.length; k++) {
            showRare.children[k].children[0].checked = false;
        }

    }
    if (cardTra.checked) {
        const showP = showTra.children[0];
        for (i = 1; i < showP.children.length; i++) {
            showP.children[i].children[0].checked = false;
        }
        showMon.hidden = true;
        showSpe.hidden = true;
        showTra.hidden = false;
        showVal.hidden = true;
        const showRare = document.getElementById("filterTrapRareDL");
        for (let k = 1; k < showRare.children.length; k++) {
            showRare.children[k].children[0].checked = false;
        }
    }
    if (cardVal.checked) {
        const showP = showVal.children[0];
        for (i = 1; i < showP.children.length; i++) {
            showP.children[i].children[0].checked = false;
        }
        showMon.hidden = true;
        showSpe.hidden = true;
        showTra.hidden = true;
        showVal.hidden = false;
        const showRare = document.getElementById("filterValueRareDL");
        for (let k = 1; k < showRare.children.length; k++) {
            showRare.children[k].children[0].checked = false;
        }
    }

});

monstroInv.addEventListener("change", (e) => {
    const monstroShow = document.getElementById("filterMonstroInvShow");
    const childrenS = monstroShow.children;

    if (monstroInv.checked) {
        monstroShow.hidden = false;
    } else {
        for (i = 0; i < childrenS.length; i++) {
            childrenS[i].children[0].checked = false;
        }

        monstroShow.hidden = true;
    }
});

monstroAtt.addEventListener("change", (e) => {
    const monstroShow = document.getElementById("filterMonstroAttShow");
    const childrenS = monstroShow.children;
    if (monstroAtt.checked) {
        monstroShow.hidden = false;
    } else {
        for (i = 0; i < childrenS.length; i++) {
            childrenS[i].children[0].checked = false;
        }
        monstroShow.hidden = true;
    }
});
monstroTyp.addEventListener("change", (e) => {
    const monstroShow = document.getElementById("filterMonstroTypeShow");
    const childrenS = monstroShow.children;
    if (monstroTyp.checked) {
        monstroShow.hidden = false;
    } else {
        for (i = 0; i < childrenS.length; i++) {
            childrenS[i].children[0].checked = false;
        }
        monstroShow.hidden = true;
    }
});
monstroLev.addEventListener("change", (e) => {
    const monstroShow = document.getElementById("filterMonstroLevShow");
    const childrenS = monstroShow.children;
    if (monstroLev.checked) {
        monstroShow.hidden = false;
    } else {
        for (i = 0; i < childrenS.length; i++) {
            childrenS[i].children[0].checked = false;
        }
        monstroShow.hidden = true;
    }
});
monstroRar.addEventListener("change", (e) => {
    const monstroShow = document.getElementById("filterMonstroRarShow");
    const childrenS = monstroShow.children;
    if (monstroRar.checked) {
        monstroShow.hidden = false;
    } else {
        for (i = 0; i < childrenS.length; i++) {
            childrenS[i].children[0].checked = false;
        }
        monstroShow.hidden = true;
    }
});

btnSearch.addEventListener("click", async (e) => {
    const showMon = document.getElementById("filterMonstro");
    const showSpe = document.getElementById("filterSpell");
    const showTra = document.getElementById("filterTrap");
    const showVal = document.getElementById("filterValue");
    let banF = 0;
    let filterData = {};
    //Codigo para filtar por tipo de carta

    //Monstruo
    if (monstro.children[0].children[0].checked) {
        banF = 1;
        let banC = 0;
        for (let j = 0; j < showMon.children.length; j++) {
            if (showMon.children[j].children[0].children[0].checked) {
                banC += 1;
            }
        }

        if (banC > 0) {
            //Filtrado por tipo de invocacion
            if (showMon.children[0].children[0].children[0].checked) {
                const invM = document.getElementById("filterMonstroInvShow");
                let invM_val = "";
                for (let k = 0; k < invM.children.length; k++) {
                    if (invM.children[k].children[0].checked) {
                        invM_val = invM.children[k].children[0].value;
                        break;
                    }
                }
                if (invM_val !== "") {
                    filterData.invM = invM_val;
                }
            }
            //Filtrado por tipo de atributos
            if (showMon.children[1].children[0].children[0].checked) {
                const attM = document.getElementById("filterMonstroAttShow");
                let attM_val = "";
                for (let k = 0; k < attM.children.length; k++) {
                    if (attM.children[k].children[0].checked) {
                        attM_val = attM.children[k].children[0].value;
                        break;
                    }
                }
                if (attM_val !== "") {
                    filterData.attM = attM_val;
                }
            }
            //Filtrado por type
            if (showMon.children[2].children[0].children[0].checked) {
                const typM = document.getElementById("filterMonstroTypeShow");
                let typM_val = "";
                for (let k = 0; k < typM.children.length; k++) {
                    if (typM.children[k].children[0].checked) {
                        typM_val = typM.children[k].children[0].value;
                        break;
                    }
                }
                if (typM_val !== "") {
                    filterData.typM = typM_val;
                }
            }
            //Filtrado por Level
            if (showMon.children[3].children[0].children[0].checked) {
                const levM = document.getElementById("filterMonstroLevShow");
                let levM_val = "";
                for (let k = 0; k < levM.children.length; k++) {
                    if (levM.children[k].children[0].checked) {
                        levM_val = levM.children[k].children[0].value;
                        break;
                    }
                }
                if (levM_val !== "") {
                    filterData.levM = parseInt(levM_val.replace("l", ""), 10);
                }
            }
            //Filtrado por rareza
            if (showMon.children[4].children[0].children[0].checked) {
                const rarM = document.getElementById("filterMonstroRarShow");
                let rarM_val = "";
                for (let k = 0; k < rarM.children.length; k++) {
                    if (rarM.children[k].children[0].checked) {
                        rarM_val = rarM.children[k].children[0].value;
                        break;
                    }
                }
                if (rarM_val !== "") {
                    filterData.rarM = rarM_val;
                }
            }

        }

    }
    //Magica
    if (monstro.children[1].children[0].checked) {
        banF = 2;
        const spellCard = document.getElementById("filterSpellCard");
        for (let k = 1; k < spellCard.children.length - 1; k++) {
            if (spellCard.children[k].children[0].checked) {
                filterData.spellC = spellCard.children[k].children[0].value;
                break;
            }
        }
        for (let k = 1; k < spellCard.children[spellCard.children.length - 1].children.length; k++) {
            if (spellCard.children[spellCard.children.length - 1].children[k].children[0].checked) {
                filterData.spellR = spellCard.children[spellCard.children.length - 1].children[k].children[0].value;
                break;
            }
        }
        //console.log(spellCard.children[spellCard.children.length-1].children.length,spellCard.children[spellCard.children.length-1].children[2].children[0]);

    }
    //trampa
    if (monstro.children[2].children[0].checked) {
        banF = 3;
        const trapCard = document.getElementById("filterTrapCard");
        for (let k = 1; k < trapCard.children.length - 1; k++) {
            if (trapCard.children[k].children[0].checked) {
                filterData.trapC = trapCard.children[k].children[0].value;
                break;
            }
        }
        for (let k = 1; k < trapCard.children[trapCard.children.length - 1].children.length; k++) {
            if (trapCard.children[trapCard.children.length - 1].children[k].children[0].checked) {
                filterData.trapR = trapCard.children[trapCard.children.length - 1].children[k].children[0].value;
                break;
            }
        }
    }
    //value
    if (monstro.children[3].children[0].checked) {
        banF = 4;
        const valueCard = document.getElementById("filterValueCard");
        for (let k = 1; k < valueCard.children.length - 1; k++) {
            if (valueCard.children[k].children[0].checked) {
                filterData.valueC = valueCard.children[k].children[0].value;
                filterData.valueC = filterData.valueC.replace("v", "");
                filterData.valueC = parseInt(filterData.valueC, 10);
                break;
            }
        }
        for (let k = 1; k < valueCard.children[valueCard.children.length - 1].children.length; k++) {
            if (valueCard.children[valueCard.children.length - 1].children[k].children[0].checked) {
                filterData.valueR = valueCard.children[valueCard.children.length - 1].children[k].children[0].value;
                break;
            }
        }
    }
    if (!banF) {
        alert("Error: No se encontraron parametros de filtado");
    } else {
        if (Object.entries(filterData).length === 0) {
            alert("Error: No se encontraron parametros de filtado");
        } else {
            const searchShow = document.getElementById("showCards_large");
            const titleCard = document.getElementById("filterNameTitle");
            const titleCardValue = titleCard.value;
            filterData.nameC = titleCardValue;
            filterData.typeC = banF;
            filterData.code = point.code;
            titleCard.value = "";

            //Codigo para hacer la solicitud a la DB
            const url = "php/searchPropery.php";
            const responseDB = await requestHandle(url, filterData);
            if (responseDB['numEle'] > 0) {
                datos = responseDB;

                //Aqui ya se debio consultar a la DB,
                // el resultado de la busqueda debe ser global



                //Aqui comineza el codigo de la paginacion
                //Se debe calcular el numero de paginas y el numero de elementos de la ultima
                //Si el residuo es 0 el numero de elementos de la ultima pagina dede se el numero de elementos por pagina
                pag.num_pag = responseDB['numEle'] / pag.num_ele_pages;
                pag.num_pag = parseInt(pag.num_pag);
                if (responseDB['numEle'] % pag.num_ele_pages > 0) {
                    pag.ele_last_pag = responseDB['numEle'] % pag.num_ele_pages;
                    pag.num_pag += 1;
                } else {
                    pag.ele_last_pag = pag.num_ele_pages;
                }
                pag.pag_cun = 1;
                showPagElement(paginationPublic[0]);

                //Aqui se muestra el contenido de la pagina 1
                //hacer funcion este codigo dandole que pagina es y cuantos elementos ocupara

                const searcShowElement = searchShow.children[0];
                showPaginaContent(searcShowElement);
                searchShow.hidden = false;
            } else {
                alert("Error: No se encontro resultados")
            }

        }
    }

    //codigo que cierra el buscador


    for (let i = 0; i < monstro.children.length - 1; i++) {
        monstro.children[i].children[0].checked = false;
    }
    showMon.hidden = true;
    showSpe.hidden = true;
    showTra.hidden = true;
    showVal.hidden = true;

    let showRare = document.getElementById("filterSpellRareDL");
    for (let k = 1; k < showRare.children.length; k++) {
        showRare.children[k].children[0].checked = false;
    }
    showRare = document.getElementById("filterTrapRareDL");
    for (let k = 1; k < showRare.children.length; k++) {
        showRare.children[k].children[0].checked = false;
    }
    showRare = document.getElementById("filterValueRareDL");
    for (let k = 1; k < showRare.children.length; k++) {
        showRare.children[k].children[0].checked = false;
    }


});


function showPaginaContent(template) {

    let contentC = "";
    template.innerHTML = "";
    totalE = 0;
    if (pag.pag_cun == pag.num_pag) {
        totalE = pag.num_ele_pages - pag.ele_last_pag;
    }
    for (let i = pag.num_ele_pages * (pag.pag_cun - 1); i < (pag.num_ele_pages * (pag.pag_cun)) - totalE; i++) {
        contentC = `
        <div class=${"col-2"}>
            <div class="oneCard">
                <div>
                    <h5 class="cardValue"><span>${datos['card'][i].rareDL}</span> Valor ${datos['card'][i].val} </h5>
                </div>
                <div class="cardImage">
                    <img src='${datos['card'][i].img}' />
                </div>
                <form class="cardAmount" idCard="${datos['card'][i].id}">
                    
                    <button class="btn btn-outline-success " type="submit">+</button>
                </form>
            </div>
        </div>`;
        template.innerHTML += contentC;
    }
    //Añadir eventos a los elementos de la paginacion
    for (let i = 0; i < template.children.length; i++) {
        //Añades un evento a cada elemento
        template.children[i].children[0].children[2].addEventListener("submit", function (e) {
            //Aqui va el codigo de la paginacion

            e.preventDefault();
            let idCard = template.children[i].children[0].children[2].getAttribute("idCard");
            idCard = parseInt(idCard);
            let k = 0;
            for (k = 0; k < datos.numEle; k++) {
                if (datos.card[k].id === idCard) {

                    break;
                }
            }
            let cardSelect = datos.card[k];
            let cardSelect_i = 0;
            let r = 0;
            for (r = 0; r < saveCardCun.length; r++) {
                if (saveCardCun[r].id == cardSelect.id) {
                    cardSelect_i = 1;
                    break;
                }
            }
            if (cardSelect_i == 0) {
                cardSelect.numeCard = 1;
                saveCardCun.push(cardSelect);
            } else {

                if (saveCardCun[r].numeCard < 3) {
                    saveCardCun[r].numeCard++;
                } else {
                    alert("Error: Limite de copias excedido");
                }

            }
            const totalnumCard = document.getElementById("addTotalC");
            const listCardAdd = document.getElementById("addCardContent");
            const totalValueC = document.getElementById("addTotalP");
            listCardAdd.innerHTML = "";
            let contentAdd = "";
            let addTotalV = 0;
            let addTotalCa = 0;
            for (let r = 0; r < saveCardCun.length; r++) {
                contentAdd = `
                    <div class="col-2 line_right">
                        <span>${saveCardCun[r].numeCard}</span>
                    </div>
                    <div class="col-4 line_right">
                        <sapn>${saveCardCun[r].name}</sapn>
                    </div>
                    <div class="col-2">
                        <span>${saveCardCun[r].val}</span>
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-success addPlus" onClick="ListAdd(${r})">+</button>
                    </div>
                    <div class="col-2">
                    <button type="button" class="btn btn-danger addSus" onClick="ListSus(${r})">-</button>
                    </div>
                `;
                listCardAdd.innerHTML += contentAdd;
                addTotalV += saveCardCun[r].val * saveCardCun[r].numeCard;
                addTotalCa += saveCardCun[r].numeCard;
            }

            totalValueC.innerText = addTotalV;
            totalnumCard.innerText = addTotalCa;


            //aqui se va agregar el codigo
            //console.log(datos.card[k]);

        });
    }


}
function showPagElement(template) {
    const divPag = document.getElementById("pagPublic");
    let contentP = "";
    template.innerHTML = "";

    for (let i = 0; i < pag.num_pag; i++) {
        contentP = `<li><a>${i + 1}</a></li>`;
        template.innerHTML = template.innerHTML + contentP;
    }
    //Añadir eventos a los elementos de la paginacion
    for (let i = 0; i < pag.num_pag; i++) {
        //Añades un evento a cada elemento
        template.children[i].children[0].addEventListener("click", function () {
            //Aqui va el codigo de la paginacion
            const searchShow = document.getElementById("showCards_large");
            let valP = template.children[i].children[0].innerHTML;
            const searcShowElement = searchShow.children[0];
            pag.pag_cun = valP;
            showPaginaContent(searcShowElement);
            for (let j = 0; j < template.children.length; j++) {
                if (template.children[j].children[0].classList.contains('active')) {
                    template.children[j].children[0].classList.remove('active');
                    break;
                }

            }
            template.children[pag.pag_cun - 1].children[0].classList.add("active");

        });
    }

    template.children[pag.pag_cun - 1].children[0].classList.add("active");
    divPag.hidden = false;
}
function ListAdd(id) {
    const totalnumCard = document.getElementById("addTotalC");
    const listCardAdd = document.getElementById("addCardContent");
    const totalValueC = document.getElementById("addTotalP");

    let cardSelect = saveCardCun[id];
    for (let i = 0; i < saveCardCun.length; i++) {
        if (saveCardCun[i].id === cardSelect.id) {
            if (saveCardCun[i].numeCard < 3) {
                saveCardCun[i].numeCard++;
            } else {
                alert("Error: Limite de copias excedido");
            }
        }
    }
    listCardAdd.innerHTML = "";
    let contentAdd = "";
    let addTotalV = 0;
    let addTotalCa = 0;
    for (let r = 0; r < saveCardCun.length; r++) {
        contentAdd = `
            <div class="col-2 line_right">
                <span>${saveCardCun[r].numeCard}</span>
            </div>
            <div class="col-4 line_right">
                <sapn>${saveCardCun[r].name}</sapn>
            </div>
            <div class="col-2">
                <span>${saveCardCun[r].val}</span>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-success addPlus" onClick="ListAdd(${r})">+</button>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-danger addSus" onClick="ListSus(${r})">-</button>
            </div>
        `;
        listCardAdd.innerHTML += contentAdd;
        addTotalV += saveCardCun[r].val * saveCardCun[r].numeCard;
        addTotalCa += saveCardCun[r].numeCard;
    }

    totalValueC.innerText = addTotalV;
    totalnumCard.innerText = addTotalCa;


}
function ListSus(id) {
    const totalnumCard = document.getElementById("addTotalC");
    const listCardAdd = document.getElementById("addCardContent");
    const totalValueC = document.getElementById("addTotalP");

    let cardSelect = saveCardCun[id];
    for (let i = 0; i < saveCardCun.length; i++) {
        if (saveCardCun[i].id === cardSelect.id) {
            if (saveCardCun[i].numeCard === 1) {
                saveCardCun = saveCardCun.filter(item => item.id !== cardSelect.id)
                break;
            } else {
                saveCardCun[i].numeCard--;
            }
        }
    }
    listCardAdd.innerHTML = "";
    let contentAdd = "";
    let addTotalV = 0;
    let addTotalCa = 0;
    for (let r = 0; r < saveCardCun.length; r++) {
        contentAdd = `
            <div class="col-2 line_right">
                <span>${saveCardCun[r].numeCard}</span>
            </div>
            <div class="col-4 line_right">
                <sapn>${saveCardCun[r].name}</sapn>
            </div>
            <div class="col-2">
                <span>${saveCardCun[r].val}</span>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-success addPlus" onClick="ListAdd(${r})">+</button>
            </div>
            <div class="col-2">
            <button type="button" class="btn btn-danger addSus" onClick="ListSus(${r})">-</button>
            </div>
        `;
        listCardAdd.innerHTML += contentAdd;
        addTotalV += saveCardCun[r].val * saveCardCun[r].numeCard;
        addTotalCa += saveCardCun[r].numeCard;
    }

    totalValueC.innerText = addTotalV;
    totalnumCard.innerText = addTotalCa;

}