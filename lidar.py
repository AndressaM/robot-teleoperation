import matplotlib.pyplot as plt
import numpy as np

# Valores do range
range_values = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.024999976158142, 0.9399999976158142, 0.9399999976158142, ...]

# Criar um array com os ângulos de 0 a 359 graus
angulos = np.arange(0, 360)

# Plotar o gráfico de linha
plt.plot(angulos, range_values, color='blue')
plt.title('Valores do Range')
plt.xlabel('Ângulo')
plt.ylabel('Valor')
plt.grid(True)
plt.show()