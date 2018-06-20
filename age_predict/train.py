from keras import load_model
from load_data import load_data

model = load_model('./model.h5')

x_train, y_train, x_test, y_test = load_data()

# hyperparameters
epochs = 100

model.fit(x_train, y_train, epochs=epochs, verbose=1, validation_data=(x_test, y_test))
model.save('trained_model.h5')