/**
 * Calculates an IPv4-mapped IPv6 address.
 * @param {string} ipv4 - An IPv4 address in dotted-quad format.
 * @return {*} (ipv6Address) - An IPv6 address string or null if a run-time problem was detected.
 */
function main() {
  // Create some test data for getFirstIpAddress(), both valid and invalid.
  let sampleCidrs = ['172.16.10.0/24', '172.16.10.0 255.255.255.0', '172.16.10.128/25', '192.168.1.216/30'];
  let sampleCidrsLen = sampleCidrs.length;
  // Create some test data for getIpv4MappedIpv6Address, both valid and invalid.
  let sampleIpv4s = [ '172.16.10.1', '172.16.10.0/24', '172.16.10.0 255.255.255.0', '172.16.256.1', '1.1.1.-1'];
  let sampleIpv4sLen = sampleIpv4s.length;

  // Iterate over sampleCidrs and pass the element's value to getFirstIpAddress().
  for (let i = 0; i < sampleCidrsLen; i++) {
    console.log(`\n--- Test Number ${i + 1} getFirstIpAddress(${sampleCidrs[i]}) ---`);
    // Call getFirstIpAddress and pass the test subnet and an anonymous callback function.
    // The callback is using the fat arrow operator: () => { }
    getFirstIpAddress(sampleCidrs[i], (data, error) => {
      // Now we are inside the callback function.
      // Display the results on the console.
      if (error) {
        console.error(`  Error returned from GET request: ${error}`);
      }
      console.log(`  Response returned from GET request: ${data}`);
    });
  }
  // Iterate over sampleIpv4s and pass the element's value to getIpv4MappedIpv6Address().
  for (let i = 0; i < sampleIpv4sLen; i++) {
    console.log(`\n--- Test Number ${i + 1} getIpv4MappedIpv6Address(${sampleIpv4s[i]}) ---`);
    // Assign the function results to a variable so we can check if a string or null was returned.
    let mappedAddress = getIpv4MappedIpv6Address(sampleIpv4s[i]);
    if( mappedAddress ) {
      console.log(`  IPv4 ${sampleIpv4s[i]} mapped to IPv6 Address: ${mappedAddress}`);
    } else {
      console.error(`  Problem converting IPv4 ${sampleIpv4s[i]} into a mapped IPv6 address.`);
      }
    }
    // Passed IPv4 is valid. Now to derive an IPv4-mapped IPv6 address.
    if (validQuads) {
      // Hardcode the prefix. During refactor, we might want to make the prefix a const.
      ipv6Address = "0:0:0:0:0:ffff:";
      // Iterate over the IPv4 parts
      for(let i=0; i < numIpv4Segments; i++) {
        // Convert part to an integer, then convert to a hex string using method toString()
        // with a base 16 (hex) encoding.
        let hexString = parseInt(ipv4Quads[i]).toString(16);
        // If hex is odd (single digit), prepend a '0'. This is why we wanted to work with a string.
        if (hexString.length % 2)
          hexString = '0' + hexString;
        // Append hex part to evolving variable ipv6Address.
        ipv6Address = ipv6Address + hexString;
        // Add a colon to split the encoded address and match the IPv6 format.
        if(i===1) {
          ipv6Address = ipv6Address + ':';
        }
      }
    }
  }
  return ipv6Address;
}