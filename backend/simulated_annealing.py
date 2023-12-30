import random
import math

def totalDuration(route, durationMatrix):
    duration = 0
    numLocations = len(route)
    for location in range(numLocations-1):
        duration += durationMatrix[route[location]][route[location+1]]
    duration += durationMatrix[route[-1]][route[0]]
    return duration

def generateNeighbour(route):
    numLocations = len(route)
    i, j = random.sample(range(numLocations), 2)

    if i > j:
        i, j = j, i
    neighbour = route[:i] + route[i:j+1][::-1] + route[j+1:]
    return neighbour

def acceptanceProbability(newCost, currentCost, temperature):
     delta = newCost - currentCost
     if delta < 0:
        return 1.0
     else:
         return math.exp(-delta/temperature)

def simulatedAnnealing(durationMatrix, T_final=1e-6):
    numLocations = len(durationMatrix)

    T_initial = durationMatrix[0][1]*100

    if numLocations < 10:
        alpha = 1 - 1e-4
    elif numLocations < 15:
        alpha = 1 - 1e-5
    elif numLocations < 25:
        alpha = 1 - 1e-6
    else:
        alpha = 1 - 5e-7
    
    currentTour = [0] + random.sample(range(1, numLocations), numLocations - 1)
    currentCost = totalDuration(currentTour, durationMatrix)
    temperature = T_initial

    while temperature > T_final:
        newTour = generateNeighbour(currentTour)
        newCost = totalDuration(newTour, durationMatrix)
        probability = acceptanceProbability(newCost, currentCost, temperature)

        if probability > random.random():
            currentTour = newTour
            currentCost = newCost
        
        temperature *= alpha

    initial_location_index = currentTour.index(0)
    currentTour = currentTour[initial_location_index:] + currentTour[:initial_location_index]

    return currentTour, currentCost

#function for testing the algorithm
def randomDurationMatrix(size, max_duration=1000):
    duration_matrix = [[0 for _ in range(size)] for _ in range(size)]

    for i in range(size):
        for j in range(i + 1, size):
            duration_matrix[i][j] = random.randint(1, max_duration)
            duration_matrix[j][i] = duration_matrix[i][j]

    return duration_matrix
