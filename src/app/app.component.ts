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

  resultExample = JSON.parse('{"data":[{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Cia Sasaki","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 98402-8929","Telefone":"(44) 98402-8929","Responsável":"","Instagram":"@ciasasaki","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Banca da Elisa","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99808-1436","Telefone":"(44) 99814-0767","Responsável":"Elisa e Cleon","Instagram":"@rebecabrall e @beth_capato","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Horta Seleta","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99980-4670","Telefone":"(44) 99980-4670","Responsável":"Graziela","Instagram":"@hortaseleta","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Sacolão Tropical","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44)99139-0452","Telefone":"(44)3226-8689","Responsável":"","Instagram":"@saco.laotropical","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Naturalis Agroecologia","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99745-9929","Telefone":"(44) 99745-9929","Responsável":"","Instagram":"@naturalis_ciclo_da_esperanca","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Pontal Nature Orgânicos","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99103-6328","Telefone":"(44) 99103-6328","Responsável":"","Instagram":"@pontalnature","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Katsu Alimentos","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99927-8984","Telefone":"(44) 99927-8984","Responsável":"","Instagram":"@katsu_alimentos","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Carlos Frutaria","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44) 99707-5781","Telefone":"(44) 99707-5781","Responsável":"Carlos","Instagram":"","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Barraca do Gaviolli","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Hortifruti","Telefone para Whattszap":"(44)99726-2991","Telefone":"(44)99805-5340","Responsável":"","Instagram":"","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"2020-03-27T20:45:29.315Z","Endereço de e-mail":"admin@deliverydobem.com","Nome Fantasia":"Casa Bah Atelie","Estado":"PR - Paraná","Cidade":"Maringá","Tipo de serviço":"Confeitaria","Telefone para Whattszap":"(44) 9941-9329","Telefone":"(44) 9941-9329","Responsável":"Barbara e Douglas","Instagram":"","Facebook":"","Site":"www.casabahdoces.com","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""},{"Carimbo de data/hora":"","Endereço de e-mail":"","Nome Fantasia":"","Estado":"","Cidade":"","Tipo de serviço":"","Telefone para Whattszap":"","Telefone":"","Responsável":"","Instagram":"","Facebook":"","Site":"","Dias de atendimento":"","Horário de atendimento":"","Observações de entrega":"","Demais informações":""}],"result":200}');
  cardExample = JSON.parse('{"Carimbo de data/hora":"2020-03-29T20:53:13.060Z","Endereço de e-mail":"teste@teste.com.br","Nome Fantasia":"Teste","Estado":"AM - Amazonas","Cidade":"Teste","Tipo de serviço":"Hortifruti, Mercearia, 123","Telefone para Whattszap":"","Telefone":"(44) 99892-2177","Responsável":"sdf","Instagram":"","Facebook":"","Site":"","Dias de atendimento":"Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado","Horário de atendimento":"","Observações de entrega":"","Demais informações":" olele"}');

  constructor(private deliveryService: DeliveryService){

    /*
    this.deliveryService.getDeliverys().subscribe(suc=>{
      console.log("sucesso", suc)
    }, console.error)
    */

    this.tratitFilters();

    console.log(this.filters)


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


  private tratitFilters(){
    this.resultExample.data.forEach(item => {
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
        this.filters[item["Estado"]][cidade][servico].list.push(item);  
      });
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
      tipos.forEach(tipo=>{
        if(this.filters[this.estado][this.cidade][tipo].selected) {
          this.filters[this.estado][this.cidade][tipo].list.forEach(element=>{
            servicos.push(element)
          })
        }
      });
      if(servicos.length == 0){
        tipos.forEach(tipo=>{
          this.filters[this.estado][this.cidade][tipo].list.forEach(element=>{
            servicos.push(element)
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
