from django.db import models


class Obra(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    data_inicio = models.DateField()
    data_fim = models.DateField(null=True, blank=True)
    
    
    def __str__(self):
        return self.nome
    
    class RDO(models.Model):
        obra = models.ForeignKey('Obra', on_delete=models.CASCADE)
        usuario = models.ForeignKey('auth.User', on_delete=models.CASCADE)
        data = models.DateField(auto_now_add=True)
        atividades = models.TextField()
        clima = models.CharField(max_length=50)
        status = models.CharField(max_length=50, choices=[("pendente", "Pendente"), ("aprovado", "Aprovado")])
        imagem = models.ImageField(upload_to='rdo_imagens', null=True, blank=True)
        
        def __str__(self):
            return f"RDO - {self.obra.nome} - {self.data}"