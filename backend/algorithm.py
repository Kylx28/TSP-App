import requests

def getDurationMatrix(destinations, mode):
    joined_destinations = '|'.join(map(str, destinations))
    API_KEY = "Insert key here"

    if mode == "DRIVING":
        url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={joined_destinations}&destinations={joined_destinations}&mode=driving&key={API_KEY}'
    elif mode == "WALKING":
        url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={joined_destinations}&destinations={joined_destinations}&mode=walking&key={API_KEY}'
    elif mode == "TRANSIT":
        url = f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={joined_destinations}&destinations={joined_destinations}&mode=transit&key={API_KEY}'

    locations = destinations
    print("Destinations:", locations)

    try:
        response = requests.get(url)
        response_data = response.json()

        durations = []
        for row in response_data['rows']:
            row_durations = []
            for element in row['elements']:
                if 'duration' in element:
                    row_durations.append(element['duration']['value'])
                elif 'transit_details' in element and 'duration' in element['transit_details']:
                    row_durations.append(element['transit_details']['duration']['value'])
                else:
                    row_durations.append('N/A')
            durations.append(row_durations)
        
        print("Matrix:", durations)
        return durations
    except requests.RequestException as e:
        print('Error Fetching Distance Matrix:', e)
        return None

def nearestNeighbour(durationMatrix):
    route = []
    numLocations = len(durationMatrix)
    visited = [False] * numLocations
    currentLocation = 0
    totalDuration = 0

    for _ in range(numLocations):
        shortestDuration = float('inf')
        nearestLocation = None
        route.append(currentLocation)
        visited[currentLocation] = True

        for nextLocation in range(numLocations):
            if not visited[nextLocation] and durationMatrix[currentLocation][nextLocation] < shortestDuration:
                nearestLocation = nextLocation
                shortestDuration = durationMatrix[currentLocation][nearestLocation]

        if nearestLocation is not None:
            totalDuration += shortestDuration
            currentLocation = nearestLocation

    totalDuration += durationMatrix[currentLocation][route[0]]
    route.append(route[0])
    return route, totalDuration

def totalDuration(route, durationMatrix):
    total = 0
    for i in range(len(route) - 1):
        total += durationMatrix[route[i]][route[i+1]]
    total += durationMatrix[route[-1]][route[0]]
    return total

def twoOpt(route, durationMatrix):
    improved = True
    num = len(route)

    while improved:
        improved = False
        bestDuration = totalDuration(route, durationMatrix)

        for i in range(1, num-1):
            for j in range(i+1, num):
                newRoute = route[:i] + route[i:j+1][::-1] + route[j+1:]
                newDuration = totalDuration(newRoute, durationMatrix)

                if newDuration < bestDuration:
                    bestDuration = newDuration
                    route = newRoute
                    improved = True

    duration = totalDuration(route, durationMatrix)

    return route, duration
