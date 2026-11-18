/**
 * Resolves a scanned QR Code ID to its corresponding graph nodeId.
 * @param {string} qrId - The scanned QR string (e.g. "QR-BLDG-B-ENTRANCE")
 * @param {Array} qrLocations - The list of QR locations from qrLocations.json
 * @returns {string|null} The matching nodeId (e.g. "NODE-ENTRANCE") or null if not found
 */
export function getNodeIdByQr(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return null;
  }

  // Find the matching QR record in qrLocations.json
  const match = qrLocations.find(item => item.qrId === qrId);
  return match ? match.nodeId : null;
}

/**
 * Gets the readable description of where the student scanned the QR code.
 * Used to display the top banner: "📍 You are here: Ground Floor Main Entrance"
 * @param {string} qrId - The scanned QR string
 * @param {Array} qrLocations - The list of QR locations from qrLocations.json
 * @returns {string} Human-readable location description or fallback
 */
export function getQrDescription(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return 'Unknown Location';
  }

  const match = qrLocations.find(item => item.qrId === qrId);
  return match && match.description ? match.description : 'Scanned Location';
}