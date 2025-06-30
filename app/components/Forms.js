194 | export default function Forms(props) {
195 |   const [verifyToken, setVerifyToken] = useState("");
196 |   const [formData, setFormData] = useState({
197 |     firstName: "",
198 |     lastName: "",
199 |     email: "",
200 |     phone: "",
201 |     message: "",
202 |     pricing: "",
203 |     broker: "",
204 |   });
205 |
206 |   const handleChange = (e) => {
207 |     const { name, value } = e.target;
208 |     setFormData((prev) => ({ ...prev, [name]: value }));
209 |   };
210 |
211 |   const handleSubmit = async (e) => {
212 |     e.preventDefault();
213 |
214 |     if (!verifyToken) {
215 |       alert("Please complete the CAPTCHA");
216 |       return;
217 |     }
218 |
219 |     const res = await verifyCaptcha(verifyToken);
220 |     console.log("🔍 CAPTCHA response:", res);
221 |
222 |     if (!res.success) {
223 |       alert("CAPTCHA verification failed. Please try again.");
224 |       return;
225 |     }
226 |
227 |     // Proceed with actual form submission (e.g., send to backend, show success)
228 |     alert("Form successfully submitted.");
229 |   };
230 |
231 |   return (
232 |     <FormContainer>
233 |       <Form onSubmit={handleSubmit}>
234 |         <FieldGroup>
235 |           <StyledLabel htmlFor="firstName">First Name *</StyledLabel>
236 |           <StyledInput name="firstName" value={formData.firstName} onChange={handleChange} required />
237 |           <StyledLabel htmlFor="lastName">Last Name *</StyledLabel>
238 |           <StyledInput name="lastName" value={formData.lastName} onChange={handleChange} required />
239 |         </FieldGroup>
240 |
241 |         <FieldGroup>
242 |           <StyledLabel htmlFor="email">Email *</StyledLabel>
243 |           <StyledInput name="email" value={formData.email} onChange={handleChange} required />
244 |           <StyledLabel htmlFor="phone">Phone Number *</StyledLabel>
245 |           <StyledInput name="phone" value={formData.phone} onChange={handleChange} required />
246 |         </FieldGroup>
247 |
248 |         <FieldGroup>
249 |           <StyledLabel htmlFor="pricing">Desired Pricing *</StyledLabel>
250 |           <StyledSelect name="pricing" value={formData.pricing} onChange={handleChange} required>
251 |             <option value="">Select Desired Pricing</option>
252 |             <option value="One Bedrooms">One bedrooms from $1.8M</option>
253 |             <option value="Two Bedrooms">Two bedrooms from $2.9M</option>
254 |             <option value="Three Bedrooms">Three bedrooms from $7.7M</option>
255 |             <option value="Penthouses">Penthouses (pricing upon request)</option>
256 |           </StyledSelect>
257 |         </FieldGroup>
258 |
259 |         <FieldGroup>
260 |           <StyledLabel>Are You a Broker?</StyledLabel>
261 |           <MainRadioContainer>
262 |             <RadioContainer>
263 |               <RadioField id="broker" type="radio" name="broker" value="yes" onChange={handleChange} />
264 |               <StyledRadioLabel htmlFor="broker">Yes</StyledRadioLabel>
265 |             </RadioContainer>
266 |             <RadioContainer>
267 |               <RadioField id="notbroker" type="radio" name="broker" value="no" onChange={handleChange} />
268 |               <StyledRadioLabel htmlFor="notbroker">No</StyledRadioLabel>
269 |             </RadioContainer>
270 |           </MainRadioContainer>
271 |         </FieldGroup>
272 |
273 |         <FieldGroup span="2">
274 |           <StyledLabel htmlFor="message">Your Inquiry</StyledLabel>
275 |           <StyledTextArea name="message" value={formData.message} onChange={handleChange} required placeholder="Write Message Here" />
276 |         </FieldGroup>
277 |
278 |         <ReCAPTCHA
279 |           sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
280 |           onChange={(token) => {
281 |             console.log("✅ reCAPTCHA token received:", token);
282 |             setVerifyToken(token);
283 |           }}
284 |         />
285 |
286 |         <SubmitButton type="submit" value="Submit" />
287 |       </Form>
288 |     </FormContainer>
289 |   );
290 | }
