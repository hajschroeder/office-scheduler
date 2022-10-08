const FIREBASE_DOMAIN = 'https://auth-practice-e9ef4-default-rtdb.firebaseio.com/'

export async function getAllStatuses() {
  const response = await fetch(`${FIREBASE_DOMAIN}/statuses.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not find statuses');
  }

  const transformedStatuses = [];

  for (const key in data) {
    const statusObject = {
      id: key,
      ...data[key],
    };

    transformedStatuses.push(statusObject)
  }

  return transformedStatuses;
}

export async function getSingleStatus(statusId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/statuses/${statusId}.json`);
  const data = await response.json();

  if (!response.ok){
    throw new Error(data.message || 'Could not find Status');
  }

  const loadedStatus = {
    id: statusId,
    ...data,
  };

  return loadedStatus;
}

export async function addStatus(statusData){
  const response = await fetch(`${FIREBASE_DOMAIN}/statuses.json`, {
    method: 'POST',
    body: JSON.stringify(statusData),
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not make post");
  }
  return null;
}

