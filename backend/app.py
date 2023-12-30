from flask import Flask, jsonify, request
from algorithm import getDurationMatrix, nearestNeighbour, twoOpt
from simulated_annealing import simulatedAnnealing

app = Flask(__name__)

def nearest_neighbour(locations, mode):
    durationMatrix = getDurationMatrix(locations, mode)
    route, duration = nearestNeighbour(durationMatrix)
    return route, duration

def two_opt(locations, mode):
    durationMatrix = getDurationMatrix(locations, mode)
    route, _ = nearestNeighbour(durationMatrix)
    route_final, duration = twoOpt(route, durationMatrix)
    return route_final, duration

def simulated_annealing(locations, mode):
    durationMatrix = getDurationMatrix(locations, mode) 
    print("Duration Matrix:", durationMatrix)
    route, duration = simulatedAnnealing(durationMatrix, 1e-6)
    return route, duration

@app.route('/api/main_algorithm', methods=['POST'])
def main_algorithm():
    route = []
    duration = 0
    data = request.get_json()
    algorithm = data.get('algorithm')
    mode = data.get('mode')
    locations = data.get('locations')

    print("Algorithm:", algorithm)
    print("Mode:", mode)
    print("Locations:", locations)

    if(algorithm == 'nearest-neighbour'):
        route, duration = nearest_neighbour(locations, mode)
    elif(algorithm == 'two-opt'):
        route, duration = two_opt(locations, mode)
    elif(algorithm == 'simulated-annealing'):
        route, duration = simulated_annealing(locations,  mode)

    print("Route:", route)
    print("Cost:", duration)

    result = {
        'Route': route,
        'Cost': duration 
    }
    return jsonify(result)

@app.route('/test')
def test_route():
    return "Hello, world!"


if __name__ == '__main__':
    app.run(debug=True)