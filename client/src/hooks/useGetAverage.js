function useGetAverage(ara) {
  let total = 0;
  for (let i = 0; i < ara.length; i++) {
    total += ara[i];
  }
  const average = total / ara.length;
  return ~~average;
}

export default useGetAverage;
