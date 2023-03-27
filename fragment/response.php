<div class="response_content row">
        
        <div class=" img_response col-4 ">
            <div class="img_card card" >
                <div class="card-body">
                    <h6 class="name_card_response text-center">Nombre Oficial</h6>
                </div>
                <img src="resource/plantilla.jpg" class="card-img-top" />
            </div>
        </div>
        <div class="info_add col-5 ">
            <ul class="list-group">
                <li class="list-group-item">
                    <div class=" d-flex justify-content-between">
                        <h6 class="name_card_es mb-1">Nombre en Español</h6>
                        <input class="name_es" required></input>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class=" input-group mb-3 d-flex  justify-content-between">
                        <label class="tag_r input-group-text" for="inputGroupSelectRareza"> Rareza en DL</label>
                        <select class="form-select" id="inputGroupRareza">
                            <option value="S" selected>Rareza</option>
                            <option value="N" style="color: black; font-weight:bold;">N</option>
                            <option value="R" style="color: blue; font-weight:bold;">R</option>
                            <option value="SR" style="color: #FFC300; font-weight:bold;">SR</option>
                            <option value="UR" style="color: purple; font-weight:bold;">UR</option>
                        </select>
                    </div>
                </li>
                <li class="list-group-item"><button id="save" class="btn btn-success"> Guardar</button>
                <button id="cancel" class="btn btn-warning"> Cancelar</button></li>
            </ul>
        </div>
    </div>