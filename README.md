# WhatsApp Widget Chat Box Library

A lightweight, customizable WhatsApp chat widget that can be easily integrated into any website. This widget provides a seamless way for your website visitors to connect with you via WhatsApp.



## Features

- 🚀 Lightweight and fast
- 🎨 Fully customizable appearance
- 📱 Mobile-responsive design
- 💬 Customizable welcome messages
- 🕒 Online/Offline status handling
- 🔧 Easy configuration
- 🌐 CDN hosted
- ⚡ No dependencies

## Quick Start

Add the following code to your HTML:

```html
<!-- Include WhatsApp Widget Stylesheet -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/1dev-hridoy/whatsapp-widget-chat-box-library@latest/src/whatsapp-widget.min.css">

<!-- Include WhatsApp Widget Script -->
<script src="https://cdn.jsdelivr.net/gh/1dev-hridoy/whatsapp-widget-chat-box-library@latest/src/whatsapp-widget.js"></script>

<!-- WhatsApp Widget Container -->
<div id="whatsapp-widget-container"></div>

<!-- WhatsApp Widget Configuration -->
<script>
    window.whatsappWidgetConfig = {
        phoneNumber: '+1234567890',          // Your WhatsApp number
        welcomeMessage: 'Welcome! How can we help you?',
        companyName: 'Your Company',
        agentName: 'Support Agent',
        closedMessage: 'We are currently offline. Please leave a message.',
        customResponse: 'Would you like to continue on WhatsApp?',
        position: 'right'                    // 'left' or 'right'
    };
</script>
```

## Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `phoneNumber` | String | WhatsApp number with country code | Required |
| `welcomeMessage` | String | Initial greeting message | 'Welcome!' |
| `companyName` | String | Your company name | 'Company' |
| `agentName` | String | Name of the support agent | 'Support' |
| `closedMessage` | String | Message shown during offline hours | 'We are offline' |
| `customResponse` | String | Custom response message | '' |
| `position` | String | Widget position ('left' or 'right') | 'right' |

## Development

1. Clone the repository:
```bash
git clone https://github.com/1dev-hridoy/WhatsApp-Widget-Chat-Box-Library.git
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Demo

Check out our [live demo](https://1dev-hridoy.github.io/WhatsApp-Widget-Chat-Box-Library/demo) to see the widget in action.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help integrating the widget, please [open an issue](https://github.com/1dev-hridoy/WhatsApp-Widget-Chat-Box-Library/issues) on GitHub.