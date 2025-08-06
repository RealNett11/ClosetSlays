// Deployment Status Checker
// This checks if your GitHub deployment completed and the site updated

console.log('🔍 Deployment Status Check');
console.log('========================');

console.log('\n📋 QUICK CHECKS:');
console.log('1. GitHub Actions: https://github.com/RealNett11/ClosetSlays/actions');
console.log('2. Look for "Deploy to GitHub Pages" with green checkmark ✅');
console.log('3. Should show "completed successfully" within last 10 minutes');

console.log('\n🕒 TIMING CHECK:');
const now = new Date();
console.log(`Current time: ${now.toLocaleString()}`);
console.log('Latest commit should be from around this time');

console.log('\n🌐 BROWSER CACHE ISSUE?');
console.log('The error still shows pk_test_ key, which means:');
console.log('❌ Either deployment not complete');
console.log('❌ Or browser showing cached version');

console.log('\n🔧 IMMEDIATE ACTIONS:');
console.log('1. Check GitHub Actions (link above)');
console.log('2. If green ✅: Clear browser cache aggressively');
console.log('3. Try incognito/private browsing mode');
console.log('4. Hard refresh: Ctrl+Shift+R or Ctrl+F5');

console.log('\n🚨 CACHE CLEARING STEPS:');
console.log('1. Press F12 (Developer Tools)');
console.log('2. Right-click the refresh button');
console.log('3. Select "Empty Cache and Hard Reload"');
console.log('4. Or: Ctrl+Shift+Delete → Clear "Cached images and files"');

console.log('\n🔍 TEST NEW BUILD:');
console.log('After clearing cache, check if key changed:');
console.log('1. Open Console in DevTools');
console.log('2. Type: console.log(import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY?.substring(0,12))');
console.log('3. Should show "pk_live_51Rd" not "pk_test_51Rd"');

console.log('\n⚠️ IF STILL pk_test_:');
console.log('1. GitHub secret might not be saved correctly');
console.log('2. Go to: https://github.com/RealNett11/ClosetSlays/settings/secrets/actions');
console.log('3. Verify VITE_STRIPE_PUBLISHABLE_KEY exists and starts with pk_live_');
console.log('4. Update it if necessary and trigger new deployment');

console.log('\n📞 IMMEDIATE DEBUG:');
console.log('Run this in browser console on https://closetslays.com:');
console.log('');
console.log('// Check build timestamp');
console.log('console.log("Build mode:", import.meta.env.MODE);');
console.log('console.log("Stripe mode:", import.meta.env.VITE_STRIPE_MODE);');
console.log('console.log("Key type:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.substring(0,8));');
console.log('');
console.log('Expected: MODE=production, VITE_STRIPE_MODE=live, Key=pk_live_');

console.log('\n🎯 ROOT CAUSE:');
console.log('The build is still embedding pk_test_ instead of pk_live_');
console.log('This means GitHub Actions is not using the updated secret');
console.log('Or the deployment hasn\'t propagated yet');

console.log('\n⏰ WAIT TIME:');
console.log('• GitHub Actions: 2-3 minutes');
console.log('• GitHub Pages propagation: 5-10 minutes');
console.log('• DNS/CDN cache: up to 15 minutes');
console.log('If it\'s been >15 minutes, there\'s a configuration issue');
