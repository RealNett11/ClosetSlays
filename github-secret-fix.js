// Emergency GitHub Secret Verification
// This will help us verify the GitHub secret is set correctly

console.log('🚨 Emergency GitHub Secret Check');
console.log('================================');

console.log('\n🔍 VERIFICATION STEPS:');
console.log('1. Go to: https://github.com/RealNett11/ClosetSlays/settings/secrets/actions');
console.log('2. Look for: VITE_STRIPE_PUBLISHABLE_KEY');
console.log('3. Click the pencil icon to edit it');
console.log('4. Verify it starts with: pk_live_');
console.log('5. If it shows pk_test_, UPDATE IT NOW');

console.log('\n📋 TO GET YOUR LIVE KEY:');
console.log('1. Go to: https://dashboard.stripe.com/apikeys');
console.log('2. Make sure you\'re viewing LIVE data (not test)');
console.log('3. Copy the "Publishable key" (starts with pk_live_)');
console.log('4. Paste it in the GitHub secret');

console.log('\n⚡ FORCE NEW DEPLOYMENT:');
console.log('After updating the secret:');
console.log('1. Go to: https://github.com/RealNett11/ClosetSlays/actions');
console.log('2. Click "Deploy to GitHub Pages"');
console.log('3. Click "Run workflow" → "Run workflow"');
console.log('4. Wait 3-5 minutes for completion');

console.log('\n🎯 ROOT CAUSE ANALYSIS:');
console.log('Since you updated the secret but still see pk_test_:');
console.log('❌ Secret wasn\'t saved correctly');
console.log('❌ Secret contains wrong key');
console.log('❌ Deployment hasn\'t run with new secret');
console.log('❌ Browser cache (less likely since you see pk_test_ in network)');

console.log('\n🔍 NETWORK TAB TEST:');
console.log('Right now, check the Network tab:');
console.log('1. Open https://closetslays.com');
console.log('2. DevTools → Network tab');
console.log('3. Start checkout process');
console.log('4. Look for api.stripe.com requests');
console.log('5. Check the "key" parameter');
console.log('6. Currently shows: pk_test_51RdEaBL... ❌');
console.log('7. Should show: pk_live_... ✅');

console.log('\n⏰ IMMEDIATE ACTION:');
console.log('The fastest fix is to verify/update the GitHub secret');
console.log('Then manually trigger a new deployment');
console.log('This should take 5-10 minutes total');

console.log('\n🔗 DIRECT LINKS:');
console.log('• GitHub Secrets: https://github.com/RealNett11/ClosetSlays/settings/secrets/actions');
console.log('• Stripe Dashboard: https://dashboard.stripe.com/apikeys');
console.log('• GitHub Actions: https://github.com/RealNett11/ClosetSlays/actions');

console.log('\n✅ SUCCESS CRITERIA:');
console.log('After the fix, Network tab should show:');
console.log('• api.stripe.com requests use key=pk_live_...');
console.log('• No more 404 errors');
console.log('• Stripe Elements load properly');
