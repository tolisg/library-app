import AWN from 'awesome-notifications';

const globalOptions = {
  icons: {
    enabled: false,
  },
};
const notifier = new AWN(globalOptions);
export default notifier;
