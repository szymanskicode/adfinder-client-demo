export default function fn(provider) {
  provider = provider.toString();
  provider = provider.toLowerCase();
  if (provider.includes('olx')) {
    return 'OLX.pl';
  } else return null;
}
