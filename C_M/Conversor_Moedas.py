# Janela -> 500x500
# Título - Conversor de Moedas
# Campos de selecionar moedas de origem e distino (campos de listas) com lebels Selecione
# Botão de "Converter"
# Lista de Exibição com os nomes das moedas

import customtkinter

customtkinter.set_appearance_mode("dark")
customtkinter.set_default_color_theme("dark-blue")

janela = customtkinter.CTk()
janela.geometry("500x500")

# Criar e confogurar janela

# Criar os botöes, textos e outros elementos
titulo = customtkinter.CTkLabel(janela, text="Conversor de moedas", font=("Arial",30))
texto_moeda_origem = customtkinter.CTkLabel(janela, text="Selecione a media de origem", font=("Arial",18))
texto_moeda_destino = customtkinter.CTkLabel(janela, text="Selecione a moeda de destino", font=("Arial",18))


campo_moeda_origem = customtkinter.CTkOptionMenu(janela, values=["USD", "EUR", "BRL", "BTC"])
campo_moeda_destino = customtkinter.CTkOptionMenu(janela, values=["USD", "EUR", "BRL", "BTC"])


def converter_moeda():
    print("Converter de moeda")

botao_converter = customtkinter.CTkButton(janela, text="Converter", command=converter_moeda, font=("Arial",17))

lista_moedas = customtkinter.CTkScrollableFrame(janela)

moedas_disponiveis = ["USD: Dólar americano", "EUR: Moeda europeia", "BRL: Real Brasileiro", "BCT: Bitcoin"]
for moeda in moedas_disponiveis:
    texto_moeda = customtkinter.CTkLabel(lista_moedas, text=moeda)
    texto_moeda.pack()

# Colocar todos os elementos na tela
titulo.pack(padx=10, pady=10)
texto_moeda_origem.pack(padx=10, pady=3)
campo_moeda_origem.pack(padx=10, pady=3)
texto_moeda_destino.pack(padx=10, pady=10)
campo_moeda_destino.pack(padx=10, pady=10)
botao_converter.pack(padx=10)
lista_moedas.pack(padx=10, pady=10)


# rodar a janela
janela.mainloop()