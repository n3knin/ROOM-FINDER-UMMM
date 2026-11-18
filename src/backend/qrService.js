
export function getNodeIdByQr(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return null;
  }

  // Find the matching QR record in qrLocations.json
  const match = qrLocations.find(item => item.qrId === qrId);
  return match ? match.nodeId : null;
}

export function getQrDescription(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return 'Unknown Location';
  }

  const match = qrLocations.find(item => item.qrId === qrId);
  return match && match.description ? match.description : 'Scanned Location';
}