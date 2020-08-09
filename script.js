function cleanFormCEP(){
        document.querySelector('#cep').value = "";
        document.querySelector('#rua').value = "";
        document.querySelector('#bairro').value = "";
        document.querySelector('#cidade').value = "";
        document.querySelector('#estado').value = "";

	document.querySelector("#rua").style.backgroundColor = "#B6BAB5";
	document.querySelector("#bairro").style.backgroundColor = "#B6BAB5";
	document.querySelector("#cidade").style.backgroundColor = "#B6BAB5";
	document.querySelector("#estado").style.backgroundColor = "#B6BAB5";

	document.location.hash = "#";
}

function fillFormCEP(outputCEP){
    let url = `https://viacep.com.br/ws/${outputCEP}/json/`;
    fetch(url)
    .then(resp => {
        if(!resp.ok){
            throw new Error();
        }
        return resp.json();
    })
    .then(data => {
	document.querySelector("#rua").style.backgroundColor = "#FFF";
	document.querySelector("#bairro").style.backgroundColor = "#FFF";
	document.querySelector("#cidade").style.backgroundColor = "#FFF";
	document.querySelector("#estado").style.backgroundColor = "#FFF";

        document.querySelector('#rua').value = data.logradouro
        document.querySelector('#bairro').value = data.bairro
        document.querySelector('#cidade').value = data.localidade
        document.querySelector('#estado').value = data.uf
    })
    .catch(error => alert("houve um problema com sua operação de fetch: ", error))
}

function submitFunction(event){
	event.preventDefault()
	let inputCEP = document.querySelector("#cep").value;
	let outputCEP = inputCEP.replace(/\D/g, '');
	if(outputCEP != ""){
		const validFormatCEP = /^[0-9]{8}$/;
		if(validFormatCEP.test(outputCEP)){
			fillFormCEP(outputCEP);
		}else{
			cleanFormCEP();
			alert("Para acessar o webservice, um CEP no formato de {8} dígitos deve ser fornecido, por exemplo: 01001000.");
		}
	}else{
		cleanFormCEP();
		alert("Para acessar o webservice, um CEP no formato de {8} dígitos deve ser fornecido, por exemplo: 01001000.");
	}
}

document.querySelector("#uniqueForm").addEventListener("submit", submitFunction)
document.querySelector("#btnClean").addEventListener("click", cleanFormCEP)