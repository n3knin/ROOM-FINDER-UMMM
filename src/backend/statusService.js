export function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + minutes;
}

export function getRoomStatus(roomClasses, now = new Date()) {
  // If no classes are passed in, return No Class
  if (!roomClasses || roomClasses.length === 0) {
    return { status: 'NO_CLASS_TODAY', label: 'No class today', activeClass: null };
  }

  // 1. Get today's day name (e.g., "Monday")
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[now.getDay()];

  // 2. Get the current clock time in minutes from midnight
  const currentMinutes = (now.getHours() * 60) + now.getMinutes();

  // 3. Filter only the classes that happen TODAY
  const todayClasses = roomClasses.filter(cls => cls.day === todayName);

  // If there are no classes scheduled for today
  if (todayClasses.length === 0) {
    return { status: 'NO_CLASS_TODAY', label: 'No class today', activeClass: null };
  }
    // 4. Check if any class is ONGOING right now
  const ongoingClass = todayClasses.find(cls => {
    const start = timeToMinutes(cls.startTime);
    const end = timeToMinutes(cls.endTime);
    return currentMinutes >= start && currentMinutes < end;
  });
  if (ongoingClass) {
    return {
      status: 'ONGOING',
      label: 'Ongoing',
      activeClass: ongoingClass
    };
  }
  // 5. Check if any class STARTS SOON (within 30 minutes)
  const startsSoonClass = todayClasses.find(cls => {
    const start = timeToMinutes(cls.startTime);
    const diff = start - currentMinutes;
    return diff > 0 && diff <= 30;
  });
  if (startsSoonClass) {
    const minsLeft = timeToMinutes(startsSoonClass.startTime) - currentMinutes;
    return {
      status: 'STARTS_SOON',
      label: `Starts in ${minsLeft}m`,
      activeClass: startsSoonClass
    };
  }
  // 6. Check if there is an upcoming class later today (more than 30 mins away)
  const nextClass = todayClasses.find(cls => timeToMinutes(cls.startTime) > currentMinutes);
  if (nextClass) {
    return {
      status: 'UPCOMING',
      label: `Next at ${nextClass.startTime}`,
      activeClass: nextClass
    };
  }
  // 7. If all classes for today have ended
  return {
    status: 'FINISHED',
    label: 'Finished for today',
    activeClass: null
  };
}
export function getClassesForRoom(allClasses, roomCode) {
  if (!allClasses || !roomCode) return [];
  
  return allClasses
    .filter(cls => cls.roomCode.toUpperCase() === roomCode.toUpperCase())
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}