import { Component } from '@angular/core';
import { DeliveryService } from './service/delivery.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  filters = {};
  opened :Boolean = false;
  estado;
  cidade = "Selecione um estado";
  tipoServiceSelect;
  loading = true;


  constructor(private deliveryService: DeliveryService){
    this.deliveryService.getDeliverys().subscribe(suc=>{
        this.tratitFilters(suc);
        this.loading = false;
    }, err=>{
      this.loading = false;
      alert("Ocorreu um erro ao obter os dados dos estabelecimentos");
    });
  }
  estados() {
    return Object.keys(this.filters).filter(item=> item.length > 0);
  }

  cidades(){
    if(this.estado){
      return Object.keys(this.filters[this.estado]);
    }
    this.cidade = "Selecione um estado";
    return ["Selecione um estado"]
    
  }

  tipoServico() {
    if(this.estado && this.cidade && this.cidade!="Selecione um estado") {
      return Object.keys(this.filters[this.estado][this.cidade]);
    }
    return [];
  }


  private tratitFilters(result){
    var code = 1;
    result.data.forEach(item => {
      if(!this.filters[item["Estado"]]){
        this.filters[item["Estado"]] = {};
      }
      var cidade = this.removeAcentos(item["Cidade"].toLocaleLowerCase());
      if(!this.filters[item["Estado"]][cidade]) {
        this.filters[item["Estado"]][cidade] = {};
      }
      var tiposServicos = item["Tipo de serviço"].split(",");
      tiposServicos.forEach(servico => {
        if(!this.filters[item["Estado"]][cidade][servico]) {
          this.filters[item["Estado"]][cidade][servico] = {}
          this.filters[item["Estado"]][cidade][servico].list = []
        }
        item.code = code;
        this.filters[item["Estado"]][cidade][servico].list.push(item);  
      });
      code++;  
    });
  }

  quantidadePorServico(tipoServico){
      return this.filters[this.estado][this.cidade][tipoServico].list.length;
  }

  setSelected(tipoServico){
    this.filters[this.estado][this.cidade][tipoServico].selected = !this.filters[this.estado][this.cidade][tipoServico].selected;
  }

  isSelected(tipoServico){
    return this.filters[this.estado][this.cidade][tipoServico].selected;
  }

  resultCards() {
    var tipos = this.tipoServico();
    var servicos =  [];
    if(tipos.length > 0){
      let codes = [];
      tipos.forEach(tipo=>{
        if(this.filters[this.estado][this.cidade][tipo].selected) {
          this.filters[this.estado][this.cidade][tipo].list.forEach(element=>{
            if(!codes.includes(element.code)){
              codes.push(element.code);
              servicos.push(element)
            }
          })
        }
      });
      if(servicos.length == 0){
        tipos.forEach(tipo=>{
          this.filters[this.estado][this.cidade][tipo].list.forEach(element=>{
            if(!codes.includes(element.code)){
              codes.push(element.code);
              servicos.push(element)
            }
          })
        });
      }
      servicos.sort((itemA, itemB) => (itemA["Nome Fantasia"] > itemB["Nome Fantasia"] ? 1 : -1));
      return servicos;
    }
    return [];
  }

  private removeAcentos(str) {
    var com_acento = "àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    var sem_acento = "aaaaaaaceeeeiiiionoooooouuuuybyr";
    var novastr="";
    for(var i=0; i<str.length; i++) {
        var troca=false;
        for (var a=0; a<com_acento.length; a++) {
            if (str.substr(i,1)==com_acento.substr(a,1)) {
                novastr+=sem_acento.substr(a,1);
                troca=true;
                break;
            }
        }
        if (troca==false) {
            novastr+=str.substr(i,1);
        }
    }
    return novastr;
  }     





}
