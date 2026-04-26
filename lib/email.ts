import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

type OrderEmailProps = {
  to: string;
  customerName: string;
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  address: string;
};

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderId,
  items,
  total,
  address,
}: OrderEmailProps) {
  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #f0f0f0;text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`,
    )
    .join("");

  await transporter.sendMail({
    from: `"GadgetHub ⚡" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Order Confirmed — GadgetHub #${orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:0;">

        <div style="background:#000;padding:32px;text-align:center;">
          <h1 style="color:#00e5cc;margin:0;font-size:28px;letter-spacing:-1px;">
            ⚡ GadgetHub
          </h1>
        </div>

        <div style="background:#fff;padding:40px 32px;">
          <h2 style="margin:0 0 8px;font-size:22px;color:#111;">
            Order confirmed! 🎉
          </h2>
          <p style="color:#666;margin:0 0 24px;">
            Hi ${customerName}, your order has been received and is being processed.
          </p>

          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="margin:0;font-size:13px;color:#888;">Order ID</p>
            <p style="margin:4px 0 0;font-family:monospace;font-size:15px;color:#111;">
              #${orderId.slice(0, 12).toUpperCase()}
            </p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:10px;text-align:left;font-size:13px;color:#888;">Product</th>
                <th style="padding:10px;text-align:center;font-size:13px;color:#888;">Qty</th>
                <th style="padding:10px;text-align:right;font-size:13px;color:#888;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <div style="border-top:2px solid #000;padding-top:16px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;">
              <span style="font-weight:bold;font-size:16px;">Total</span>
              <span style="font-weight:bold;font-size:16px;color:#00e5cc;">$${total.toFixed(2)}</span>
            </div>
          </div>

          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:32px;">
            <p style="margin:0;font-size:13px;color:#888;">Delivering to</p>
            <p style="margin:4px 0 0;font-size:15px;color:#111;">${address}</p>
          </div>

          <p style="color:#666;font-size:14px;margin:0;">
            Estimated delivery: <strong>3-5 business days</strong>
          </p>
        </div>

        <div style="background:#f5f5f5;padding:24px 32px;text-align:center;">
          <p style="margin:0;font-size:13px;color:#999;">
            © 2026 GadgetHub. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
